import { styled } from "@mui/system";

const DiamondBg = "/images/bg-rarity-diamond.jpg"
const GoldBg = "/images/bg-rarity-gold.jpg"
const SilverBg = "/images/bg-rarity-silver.jpg"
const BronzeBg = "/images/bg-rarity-bronze.jpg"
const CommonBg = "/images/bg-rarity-common.jpg"

export const CardWrapper = styled("div")`
  margin: 0 1rem;
`

export const CardBack = styled("div")`
  display: inline-block;
  position: relative;
  background-repeat: no-repeat;
  background-size: cover;
  .overallRating {
    position: absolute;
    right: 8px;
    top: 8px;
    z-index: 999;
    span {
      position: absolute;
      font-size: 1.25rem;
      font-weight: bold;
      text-shadow: 2px 2px 8px #000;
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    img {
      width: 50px;
    }
  }
  .Common {
    background-image: url(${CommonBg});
    background-repeat: no-repeat;
    background-size: cover;
  }
  .Bronze {
    background-image: url(${BronzeBg});
    background-repeat: no-repeat;
    background-size: cover;
  }
  .Silver {
    background-image: url(${SilverBg});
    background-repeat: no-repeat;
    background-size: cover;
  }
  .Gold {
    background-image: url(${GoldBg});
    background-repeat: no-repeat;
    background-size: cover;
  }
  .Diamond {
    background-image: url(${DiamondBg});
    background-repeat: no-repeat;
    background-size: cover;
  }
`

export const CardArtBorder = styled("div")`
  position: absolute;
  z-index: 999;
`

export const PlayerName = styled("div")`
  position: absolute;
  z-index: 99999;
  bottom: 27px;
  left: 2px;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: bold;
  width: 180px;
  text-align: center;
`