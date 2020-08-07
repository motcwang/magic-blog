package response

// Response struct
type Response struct {
	Code    int         `json:"code"`
	Data    interface{} `json:"data"`
	Message string      `json:"message"`
}

// SUCCESS code
const SUCCESS = 99990200

// BUSINESS code
const (
	UNKNOW = 99990001 + iota
)
