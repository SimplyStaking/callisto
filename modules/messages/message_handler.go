package messages

import (
	"fmt"

	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	channeltypes "github.com/cosmos/ibc-go/v4/modules/core/04-channel/types"
	"github.com/gogo/protobuf/proto"

	"github.com/forbole/bdjuno/v4/database"
	"github.com/forbole/bdjuno/v4/modules/utils"
	msgtypes "github.com/forbole/bdjuno/v4/types"
	"github.com/forbole/juno/v5/types"
)

// HandleMsg represents a message handler that stores the given message inside the proper database table
func HandleMsg(
	index int, msg sdk.Msg, tx *types.Tx,
	parseAddresses MessageAddressesParser, cdc codec.Codec, db *database.Db,
) error {

	// Get the involved addresses
	addresses, err := parseAddresses(cdc, msg)
	if err != nil {
		return err
	}

	// Marshal the value properly
	bz, err := cdc.MarshalJSON(msg)
	if err != nil {
		return err
	}

	// Save message type
	db.SaveMessageType(msgtypes.NewMessageType(
		proto.MessageName(msg),
		utils.GetModuleNameFromTypeURL(proto.MessageName(msg)),
		utils.GetMsgFromTypeURL(proto.MessageName(msg)),
		tx.Height))

	// Handle MsgRecvPacket data object
	if msgIBC, ok := msg.(*channeltypes.MsgRecvPacket); ok {
		trimMessageString := TrimLastChar(string(bz))
		trimDataString := string(msgIBC.Packet.Data)[1:]
		return db.SaveMessage(types.NewMessage(
			tx.TxHash,
			index,
			proto.MessageName(msg),
			fmt.Sprintf("%s,%s", trimMessageString, trimDataString),
			addresses,
			tx.Height,
		))
	}

	return db.SaveMessage(types.NewMessage(
		tx.TxHash,
		index,
		proto.MessageName(msg),
		string(bz),
		addresses,
		tx.Height,
	))
}
