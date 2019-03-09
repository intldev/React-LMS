import styled from "styled-components";
import { Row, Col } from "antd";
import { TableData } from "../../styled/table";
import { CustomTooltip } from "./customToolTip";
import { Card } from "@edulastic/common";
import { darkGrey, grey, lightBlue, black } from "@edulastic/colors";

export const StyledCard = styled(Card)`
  margin: 10px;
`;

export const StyledContainer = styled(Row)`
  flex-flow: column nowrap;

  .question-area {
    min-height: 110px;
    padding: 10px;

    .question-container {
      flex: 1 1 300px;
      p {
        margin: 4px 0;
        color: ${darkGrey};
      }

      p:nth-child(1) {
        font-weight: 900;
      }

      p:nth-child(2) {
        font-size: 12px;
      }

      .answer-slider-percentage {
        flex: 0 0 50px;
        text-align: center;
        color: ${lightBlue};
      }

      .answer-slider {
        margin: 0 30px;
        flex: 1;
      }
    }
  }
`;

export const StyledTableData = styled(TableData)`
  .ant-table-body {
    table {
      thead {
      }

      tbody {
        tr {
          td {
            height: 50px;
            padding: 5px;
          }

          td:nth-child(5) {
            padding: 0;

            .response-frequency-table-correct-td {
              padding: 0;
              height: 100%;
              width: 100%;
              display: flex;
              justify-content: flex-end;
              align-items: center;
              padding: 10px;
            }
          }
        }
      }
    }
  }
  .ant-table-body::-webkit-scrollbar {
    height: 10px;
  }

  .ant-table-body::-webkit-scrollbar-track {
    background: ${grey};
  }

  .ant-table-body::-webkit-scrollbar-thumb {
    background: ${darkGrey};
  }
`;

export const StyledResponseTagContainer = styled(Col)`
  flex: 1 1 100px;
  .table-tag {
    border: solid 2px ${darkGrey};
    border-radius: 40px;
    margin: 2px 5px;
    text-align: center;
    padding: 3px 10px;
    min-width: 100px;
    p {
      margin: 2px;
    }
  }

  .table-tag-correct {
    border-color: #81a342;
  }

  .table-tag-warn {
    border-color: #d8ad38;
  }
`;

export const StyledSimpleBarChart = styled(StyledCard)`
  padding: 10px;

  .recharts-wrapper .recharts-cartesian-grid-horizontal line:first-child,
  .recharts-wrapper .recharts-cartesian-grid-horizontal line:last-child {
    stroke-opacity: 0;
  }
`;

export const StyledCustomTooltip = styled(CustomTooltip)`
  max-width: 500px;

  .ant-tooltip-content {
    .ant-tooltip-arrow {
      border-top-color: white;
    }
    .ant-tooltip-inner {
      background-color: white;
      color: ${black};

      .response-frequency-table-tooltip-value {
        font-weight: 900;
        margin-left: 5px;
      }
    }
  }
`;