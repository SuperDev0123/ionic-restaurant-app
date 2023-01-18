import {
  FeatureTitle,
  LeftCellCaption,
  PaddingBox,
  StyledDivider,
  StyledInfoIcon,
  StyledRow
} from "./styled-components";
import {Box, Tooltip} from "@mui/material";

function BodyRow({children, feature, gridTemplateColumns}) {
  return (
    <Box>
      <StyledDivider />
      <StyledRow display="grid" gridTemplateColumns={gridTemplateColumns}>
        <FeatureName feature={feature} />
        {children}
      </StyledRow>
    </Box>
  )
}

function FeatureName({feature}) {
  let info = '';
  let caption = '';

  if(feature.tooltip !== undefined && feature.tooltip !== ''){
    info = <Tooltip title={feature.tooltip} placement="right-end"><StyledInfoIcon /></Tooltip>;
  }

  if(feature.caption !== undefined && feature.caption !== ''){
    caption = <LeftCellCaption>{feature.caption}</LeftCellCaption>;
  }

  return (
    <PaddingBox>
      <FeatureTitle>
        {feature.title || ''}
        {info}
      </FeatureTitle>
      {caption}
    </PaddingBox>
  )
}

export default BodyRow;