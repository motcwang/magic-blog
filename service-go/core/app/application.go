package app

import (
	"context"
	"magician/common/log"
	"magician/config"
	"magician/core"
	"magician/core/middleware"
	"magician/core/server"
	"magician/router"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/gin-gonic/gin"
)

// Run start app
func Run() {
	log.Info("Start run application.")

	core.GetCoreLoader().Init()
	runHTTPServer(config.CONFIG.Server)
}

func runHTTPServer(conf config.Server) {
	app := gin.New()

	app.Use(middleware.RecoveryMiddleware())

	router.Register(app)

	httpServer := server.HTTPServer(app, conf)

	go func() {
		log.Infof("Service started successfully, address=%s", httpServer.Addr)
		// 服务连接
		if err := httpServer.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("listen: %s\n", err)
		}
	}()

	waittingForExit(httpServer)
}

func waittingForExit(srv *http.Server) {
	// 等待中断信号以优雅地关闭服务器（设置 5 秒的超时时间）
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
