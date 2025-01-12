import React from "react";
import { connect } from "react-redux";
import { withTranslation } from 'react-i18next';

import { CHANGE_BRANCH_LABEL } from "../../actions/types";
import { SidebarSubtitle } from "./styles";
import { controlsWidth } from "../../util/globals";
import CustomSelect from "./customSelect";

@connect((state) => ({
  selected: state.controls.selectedBranchLabel,
  available: state.tree.availableBranchLabels,
  canRenderBranchLabels: state.controls.canRenderBranchLabels
}))
class ChooseBranchLabelling extends React.Component {
  constructor(props) {
    super(props);
    this.change = (value) => {this.props.dispatch({type: CHANGE_BRANCH_LABEL, value: value.value});};
  }
  render() {
    if (!this.props.canRenderBranchLabels) return null;
    const { t } = this.props;
    const selectOptions = this.props.available.map((x) => ({value: x, label: x}));
    return (
      <div style={{paddingTop: 5}}>
        <SidebarSubtitle>
          {t("sidebar:Branch Labels")}
        </SidebarSubtitle>
        <div style={{width: controlsWidth, fontSize: 14}}>
          <CustomSelect
            value={selectOptions.filter(({value}) => value === this.props.selected)}
            options={selectOptions}
            isClearable={false}
            isSearchable={false}
            isMulti={false}
            onChange={this.change}
          />
        </div>
      </div>
    );
  }
}

const WithTranslation = withTranslation()(ChooseBranchLabelling);
export default WithTranslation;
