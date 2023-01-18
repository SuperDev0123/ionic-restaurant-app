import { styled } from "@mui/system"
import { Box, Divider, Typography } from "@mui/material"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"

export const StyledRow = styled(Box)`
  :hover {
    background: #191919;
  }
`

export const PaddingBox = styled(Box)`
  padding: 20px;
`

export const FlexBox = styled(PaddingBox)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const FlexCenterBox = styled(FlexBox)`
  justify-content: center;
  align-items: center;
  text-align: center;
`

export const StyledDivider = styled(Divider)`
  border-color: rgba(41, 41, 41);
`

export const StyledInfoIcon = styled(InfoOutlinedIcon)`
  user-select: none;
  vertical-align: middle;
  margin-left: 5px;
  height: 0.8em;
  width: 0.8em;
  :hover {
    fill: rgb(51, 153, 255);
  }
`

export const HeadCellTitle = styled(Typography)`
  font-weight: 600;
  font-size: 28px;
  margin-bottom: 5px;
  padding-left: 5px;
  font-family: "Road Rage", sans-serif;
  text-transform: uppercase;
  &.Bronze {
    color: #b46d26;
  }
  &.Silver {
    color: #CCC;
  }
  &.Gold {
    color: #FFD700;
  }
  &.Diamond {
    color: #61E2FF;
  }
`

export const FeatureTitle = styled(Typography)`
  font-size: 15px;
`

export const HeadCellCaption = styled(Typography)`
  font-size: 15px;
  color: rgb(154, 154, 154);
`

export const LeftCellCaption = styled(Typography)`
  font-size: 14px;
  color: rgb(154, 154, 154);
  margin-top: 5px;
`

export const PriceText = styled(Typography)`
  font-size: 16px;
  margin-top: 10px;
`
