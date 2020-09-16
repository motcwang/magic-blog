package app

import (
	"context"
	"magician/common/log"
	"magician/config"
	"magician/core/injector"
	"magician/core/server"
	"net/http"
	"os"
	"os/signal"
	"time"
)

// Run start app
func Run() {
	log.Info("Start run application.")
	// todo invoke cleanup func
	initModule()
}

func initModule() (func(), error) {

	container, containerCleanupFunc, err := injector.BuildContainer()
	if err != nil {
		return nil, err
	}

	runHTTPServer(config.CONFIG.Server, container.Engine)

	return func() {
		containerCleanupFunc()
	}, nil
}

func runHTTPServer(conf config.Server, handler http.Handler) {
	httpServer := server.HTTPServer(handler, conf)

	go func() {
		log.Infof("Service started successfully, address=%s", httpServer.Addr)
		if err := httpServer.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("listen: %s\n", err)
		}
	}()

	waittingForExit(httpServer)
}

func waittingForExit(srv *http.Server) {
	quit := make(chan os.Signal)
	signal.Notify(quit, os.Interrupt)
	<-quit
	log.Info("Shutdown Server ...")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		log.Fatal("Server Shutdown:", err)
	}
	log.Info("Server exiting")
}
