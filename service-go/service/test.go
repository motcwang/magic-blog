package service

import (
	"magician/common/log"
	"magician/model/dao"
)

// Test for test
type Test struct {
	UserDao *dao.User
}

// Test method
func (t *Test) Test() {
	log.Errorf("test service %o", t.UserDao)
}
