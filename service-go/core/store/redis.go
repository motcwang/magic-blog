package store

import (
	"magician/config"

	"github.com/go-redis/redis"
)

// RedisClient struct
type RedisClient struct {
	Cli       *redis.Client
	KeyPrefix string
}

// NewRedisClient for create
func NewRedisClient(cfg config.Redis) *RedisClient {
	cli := redis.NewClient(&redis.Options{
		Addr:     cfg.Address,
		DB:       cfg.DB,
		Password: cfg.Password,
	})

	return &RedisClient{
		Cli:       cli,
		KeyPrefix: cfg.KeyPrefix,
	}
}
