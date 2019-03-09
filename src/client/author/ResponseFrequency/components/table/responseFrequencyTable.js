import React from "react";
import { Component } from "react";
import { StyledCard, StyledTableData, StyledCustomTooltip } from "../styled";
import { Row, Col } from "antd";
import { ResponseTag } from "./responseTag";

export class ResponseFrequencyTable extends Component {
  constructor(props) {
    super(props);
    this.init();
  }

  init() {
    this.columns = this.props.columns;

    this.columns[0].sorter = this.sortTextColumn.bind(null, "qLabel");
    this.columns[4].sorter = this.sortTextColumn.bind(null, "corr_cnt");
    this.columns[4].render = (data, record) => {
      let tooltipText = (record, assessment) => {
        let { corr_cnt = 0, incorr_cnt = 0, skip_cnt = 0, part_cnt = 0 } = record;
        let sum = corr_cnt + incorr_cnt + skip_cnt + part_cnt;
        return (
          <div>
            <Row type="flex" justify="start">
              <Col className="response-frequency-table-tooltip-key">Assessment Name: </Col>
              <Col className="response-frequency-table-tooltip-value">{this.props.assessment.testName}</Col>
            </Row>
            <Row type="flex" justify="start">
              <Col className="response-frequency-table-tooltip-key">Question: </Col>
              <Col className="response-frequency-table-tooltip-value">{record.qLabel}</Col>
            </Row>
            <Row type="flex" justify="start">
              <Col className="response-frequency-table-tooltip-key">Question Type: </Col>
              <Col className="response-frequency-table-tooltip-value">{record.qType}</Col>
            </Row>
            <Row type="flex" justify="start">
              <Col className="response-frequency-table-tooltip-key">Standards: </Col>
              <Col className="response-frequency-table-tooltip-value">{record.standards}</Col>
            </Row>
            <Row type="flex" justify="start">
              <Col className="response-frequency-table-tooltip-key">Max Score: </Col>
              <Col className="response-frequency-table-tooltip-value">{record.maxScore}</Col>
            </Row>
            <Row type="flex" justify="start">
              <Col className="response-frequency-table-tooltip-key">Performance: </Col>
              <Col className="response-frequency-table-tooltip-value">{corr_cnt}</Col>
            </Row>
            <Row type="flex" justify="start">
              <Col className="response-frequency-table-tooltip-key">Students Skipped: </Col>
              <Col className="response-frequency-table-tooltip-value">{skip_cnt}</Col>
            </Row>
            <Row type="flex" justify="start">
              <Col className="response-frequency-table-tooltip-key">Students Correct: </Col>
              <Col className="response-frequency-table-tooltip-value">{corr_cnt}</Col>
            </Row>
            <Row type="flex" justify="start">
              <Col className="response-frequency-table-tooltip-key">Total Students: </Col>
              <Col className="response-frequency-table-tooltip-value">{sum}</Col>
            </Row>
          </div>
        );
      };

      let { corr_cnt = 0, incorr_cnt = 0, skip_cnt = 0, part_cnt = 0 } = record;
      let sum = corr_cnt + incorr_cnt + skip_cnt + part_cnt;
      let correct = ((corr_cnt / sum) * 100).toFixed(2);

      return (
        <div style={{ display: "contents" }}>
          <StyledCustomTooltip
            correct={correct}
            correctThreshold={this.props.correctThreshold}
            placement="top"
            title={tooltipText.bind(null, record)}
          />
        </div>
      );
    };

    this.columns[5].render = (data, record) => {
      let { corr_cnt = 0, incorr_cnt = 0, skip_cnt = 0, part_cnt = 0 } = record;
      let sum = corr_cnt + incorr_cnt + skip_cnt + part_cnt;
      let skip = (data / sum) * 100;
      return skip.toFixed(2) + "%";
    };

    this.columns[6].render = (data, record) => {
      let arr = [];

      if (!data || Object.keys(data).length === 0) {
        let { corr_cnt = 0, incorr_cnt = 0, skip_cnt = 0, part_cnt = 0 } = record;
        let sum = corr_cnt + incorr_cnt + skip_cnt + part_cnt;
        arr.push({ value: ((corr_cnt / sum) * 100).toFixed(2), name: "Correct", key: "corr_cnt" });
        arr.push({ value: ((incorr_cnt / sum) * 100).toFixed(2), name: "Incorrect", key: "incorr_cnt" });
        arr.push({ value: ((part_cnt / sum) * 100).toFixed(2), name: "Partially Correct", key: "part_cnt" });
        arr.push({ value: ((skip_cnt / sum) * 100).toFixed(2), name: "Skip", key: "skip_cnt" });
      } else {
        let sum = 0;
        arr = Object.keys(data).map((key, i) => {
          let obj = {
            value: data[key],
            name: key,
            key: key
          };
          sum = sum + data[key];
          return obj;
        });

        for (let i = 0; i < arr.length; i++) {
          arr[i].value = ((arr[i].value / sum) * 100).toFixed(2);
        }
      }

      return (
        <Row type="flex" justify="start" className="table-tag-container">
          {arr.map((data, i) => {
            return (
              <ResponseTag key={i} data={data} incorrectFrequencyThreshold={this.props.incorrectFrequencyThreshold} />
            );
          })}
        </Row>
      );
    };
  }

  sortTextColumn(key, a, b) {
    if (a[key] > b[key]) {
      return -1;
    } else if (a[key] < b[key]) {
      return 1;
    } else {
      return 0;
    }
  }

  render() {
    return (
      <StyledCard className="response-frequency-table">
        <StyledTableData columns={this.columns} dataSource={this.props.data} rowKey="uid" />
      </StyledCard>
    );
  }
}