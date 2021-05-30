import React from 'react';
import styled from 'styled-components';
import {
  UnorderedListOutlined
} from '@ant-design/icons';

export const CardWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 0;
  margin: 0;
  margin-bottom: 16px;
  border: 1px solid #c8ced3;
  border-radius: 2px;
  box-shadow: #666 0px 5px 5px -5px;
`;

export const CardHeaderWrapper = styled.div`
  width: 100%;
  min-height: 42px;
  flex-shrink: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  padding: 5px 10px;
  font-size: 14px;
  color: #23282c;
  background-color: #f0f3f5;
  border-bottom: 1px solid #c8ced3;
  .items-left {
    display: flex;
    flex-shrink: 0;
    margin: 5px 15px 5px 2px;
    .icon {
      font-size: 16px;
      margin-right: 5px;
      display: flex;
      align-items: center;
    }
    p {
      font-size: 15px;
    }
  }
  .items-right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    & > * {
      margin-left: 10px;
      &:first-child {
        margin-left: 0;
      }
    }
  }
`;

export const CardContentWrapper = styled.div`
  flex: 1;
  padding: 10px;
  @media (min-width: 768px) {
    padding: 10px 20px 20px;
  }
`;

export default function({ children, ...props }) {
  return (
    <CardWrapper {...props} style={props.style}>
      {(props.header || props.extra) && (
        <CardHeaderWrapper className="header">
          {props.header && (
            <div className="items-left">
            <UnorderedListOutlined />
              <p>{props.header.title}</p>
            </div>
          )}
          {props.extra && <div className="items-right">{props.extra}</div>}
        </CardHeaderWrapper>
      )}
      <CardContentWrapper className="content">{children}</CardContentWrapper>
    </CardWrapper>
  );
}
