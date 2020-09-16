package provider

import (
	"magician/service"

	"github.com/google/wire"
)

var serviceTestSet = wire.NewSet(wire.Struct(new(service.Test), "*"))

// ServiceSet inject
var ServiceSet = wire.NewSet(serviceTestSet)
