package logger

import (
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"

	"github.com/fabiokaelin/password-safe/config"
)

var (
	// Log variable is a globally accessible variable which will be initialized when the InitializeZapCustomLogger function is executed successfully.
	Log *zap.Logger
)

/*
InitializeZapCustomLogger Funtion initializes a logger using uber-go/zap package in the application.
*/
func InitializeZapCustomLogger() {
	loglevel := zapcore.DebugLevel
	if config.GinMode == "release" {
		loglevel = zapcore.ErrorLevel
	}
	conf := zap.Config{
		Encoding: "console",
		Level:    zap.NewAtomicLevelAt(loglevel),
		// Level:       zap.NewAtomicLevelAt(zapcore.InfoLevel),
		OutputPaths:      []string{"stdout"},
		ErrorOutputPaths: []string{"stderr"},
		EncoderConfig: zapcore.EncoderConfig{
			LevelKey:   "level",
			MessageKey: "msg",
			CallerKey:  "file",
			// TimeKey:      "time",
			EncodeLevel:  zapcore.LowercaseLevelEncoder,
			EncodeTime:   zapcore.ISO8601TimeEncoder,
			EncodeCaller: zapcore.ShortCallerEncoder,
		},
	}
	foo, err := conf.Build()
	if err != nil {
		Log.Error(err.Error())
	}
	Log = foo
}
