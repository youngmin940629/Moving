import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  float: left;
  margin-left: 22px;
  margin-bottom: 10px;
`;

const MoviePoster = ({ i }) => {
  return (
    <>
      <Card>
        <img
          src={'/img/poster' + (i + 1) + '.jpg'}
          width="150px"
          height="200px"
          style={{ display: 'block' }}
        />
      </Card>
    </>
  );
};

export default MoviePoster;
