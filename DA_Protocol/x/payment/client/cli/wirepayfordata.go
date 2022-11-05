package cli

import (
	"encoding/hex"
	"errors"
	"fmt"

	"github.com/spf13/cobra"

	"github.com/celestiaorg/celestia-app/x/payment/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

const FlagSquareSizes = "square-sizes"

func CmdWirePayForData() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "payForData [hexNamespace] [hexMessage]",
		Short: "Creates a new MsgWirePayForData",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			// get the account name
			accName := clientCtx.GetFromName()
			if accName == "" {
				return errors.New("no account name provided, please use the --from flag")
			}

			// decode the namespace
			namespace, err := hex.DecodeString(args[0])
			if err != nil {
				return fmt.Errorf("failure to decode hex namespace: %w", err)
			}

			// decode the message
			message, err := hex.DecodeString(args[1])
			if err != nil {
				return fmt.Errorf("failure to decode hex message: %w", err)
			}

			pfdMsg, err := types.NewWirePayForData(namespace, message, types.AllSquareSizes(len(message))...)
			if err != nil {
				return err
			}

			// use the keyring to programmatically sign multiple PayForData txs
			signer := types.NewKeyringSigner(clientCtx.Keyring, accName, clientCtx.ChainID)

			err = signer.UpdateAccountFromClient(clientCtx)
			if err != nil {
				return err
			}

			// get and parse the gas limit for this tx
			rawGasLimit, err := cmd.Flags().GetString(flags.FlagGas)
			if err != nil {
				return err
			}
			gasSetting, err := flags.ParseGasSetting(rawGasLimit)
			if err != nil {
				return err
			}

			// get and parse the fees for this tx
			fees, err := cmd.Flags().GetString(flags.FlagFees)
			if err != nil {
				return err
			}
			parsedFees, err := sdk.ParseCoinsNormalized(fees)
			if err != nil {
				return err
			}

			// sign the  MsgPayForData's ShareCommitments
			err = pfdMsg.SignShareCommitments(
				signer,
				types.SetGasLimit(gasSetting.Gas),
				types.SetFeeAmount(parsedFees),
			)
			if err != nil {
				return err
			}

			// run message checks
			if err = pfdMsg.ValidateBasic(); err != nil {
				return err
			}

			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), pfdMsg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
