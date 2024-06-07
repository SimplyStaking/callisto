package messages

import (
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/forbole/bdjuno/v4/database"
	"github.com/forbole/juno/v5/modules"
	"github.com/forbole/juno/v5/types"
)

var _ modules.Module = &Module{}

// Module represents the module allowing to store messages properly inside a dedicated table
type Module struct {
	parser MessageAddressesParser

	cdc codec.Codec
	db  *database.Db
}

func NewModule(parser MessageAddressesParser, cdc codec.Codec, db *database.Db) *Module {
	return &Module{
		parser: parser,
		cdc:    cdc,
		db:     db,
	}
}

// Name implements modules.Module
func (m *Module) Name() string {
	return "messages"
}

// HandleMsg implements modules.MessageModule
func (m *Module) HandleMsg(index int, msg sdk.Msg, tx *types.Tx) error {
	return HandleMsg(index, msg, tx, m.parser, m.cdc, m.db)
}