import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import { InjectedIntlProps, injectIntl } from "react-intl";

import TopNavBarLink from "../TopNavBarLink";

import styles from "./styles.module.css";

import { ROUTES_ARRAY } from "../../utils/constants";
import { IRoutes } from "../../store/selection/pages/model";
import { isEnableNextPage } from "../../store/selection/app/wizardSelectionSelector/wizardSelectionSelector";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../store/combineReducers";
import RootAction from "../../store/ActionType";
import messages from "./messages";
import { setPageWizardPageAction } from "../../store/wizardContent/pages/action";

interface IStateProps {
  isVisited: IRoutes;
  isEnableNextPage: boolean;
}

interface IDispatchProps {
  setPage: (route: string) => void;
}

type Props = RouteComponentProps & IStateProps & IDispatchProps & InjectedIntlProps;

const TopNavBar = (props: Props) => {
  const { formatMessage } = props.intl;
  const topNavBarData: string[] = [
    formatMessage(messages.welcome),
    formatMessage(messages.frameworks),
    formatMessage(messages.pages),
    formatMessage(messages.services),
    formatMessage(messages.summary)
  ];
  const { pathname } = props.location;
  const [currentPathIndex, setPathIndex] = React.useState(
    ROUTES_ARRAY.indexOf(pathname)
  );
  const topNavTabClicked = (
    idx: number,
    visited: boolean,
    disabled: boolean
  ) => {
    if (visited && !disabled) {
      setPathIndex(ROUTES_ARRAY.indexOf(ROUTES_ARRAY[idx]));
    }
  };

  React.useEffect(() => {
    setPathIndex(ROUTES_ARRAY.indexOf(pathname));
  });
  const { isVisited, intl, isEnableNextPage, setPage } = props;
  return (
    <React.Fragment>
      {
        <nav
          className={classnames(styles.topNavBar)}
          aria-label={intl.formatMessage(messages.ariaNavLabel)}
        >
          <div>
            {topNavBarData.map((sidebartitle, idx) => {
              const alreadyVisitedRouteAndCanVisit =
                isVisited[ROUTES_ARRAY[idx]] && isEnableNextPage;
              const isOtherVisitedRoute =
                idx !== currentPathIndex && isVisited[ROUTES_ARRAY[idx]];

              const navTabClickedHandler = (
                event: React.MouseEvent<HTMLDivElement, MouseEvent>
              ) => {
                event.preventDefault();
                topNavTabClicked(
                  idx,
                  isVisited[ROUTES_ARRAY[idx]],
                  !alreadyVisitedRouteAndCanVisit
                );
              };
              return (
                <div
                  className={classnames(styles.itemBorder, {
                    [styles.visitedPath]: alreadyVisitedRouteAndCanVisit,
                    [styles.nextPath]:
                      idx > currentPathIndex && !alreadyVisitedRouteAndCanVisit,
                    [styles.itemBorderTop]: idx === 0
                  })}
                  key={sidebartitle}
                  onClick={navTabClickedHandler}
                >
                  <TopNavBarLink
                    disabled={!alreadyVisitedRouteAndCanVisit}
                    path={ROUTES_ARRAY[idx]}
                    text={sidebartitle}
                    visitedCheck={isOtherVisitedRoute}
                    isSelected={idx === currentPathIndex}
                    pageNumber={idx + 1}
                    reducerSetPage={setPage}
                  />
                </div>
              );
            })}
          </div>
        </nav>
      }
    </React.Fragment>
  );
};

const mapStateToProps = (state: any): IStateProps => ({
  isEnableNextPage: isEnableNextPage(state),
  isVisited: state.wizardRoutes.isVisited
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): IDispatchProps => ({
  setPage: (route: string) => {
    dispatch(setPageWizardPageAction(route));
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectIntl(TopNavBar)));
