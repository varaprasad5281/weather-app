import React from 'react';
import { css } from '@emotion/react';
import { PropagateLoader } from 'react-spinners';
import './index.css'
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Loader = () => {
  return (
    <div className="loader">
      <PropagateLoader color={'#36D7B7'} loading={true} css={override} size={15} />
    </div>
  );
};

export default Loader;
