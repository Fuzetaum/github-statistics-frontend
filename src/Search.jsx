import {
  Button,
  Card,
  Input,
  Layout,
} from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import SearchResults from './SearchResults';

import './Search.scss';

const { Content, Header } = Layout;

const Search = () => {
  const [repository, setRepository] = useState('');
  const [owner, setOwner] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(async () => {
    if (loading) {
      const response = await axios.put(`${process.env.BACKEND_URL}/statistics?repository=${repository}&owner=${owner}`);
      if (response.status === 200) setTimeout(async () => {
        const statisticsResponse = await axios.get(`${process.env.BACKEND_URL}/statistics?repository=${repository}&owner=${owner}`);
        if (response.status === 200 && statisticsResponse.data.success) {
          dispatch({
            type: 'REPOSITORY_LOAD',
            payload: {
              repository,
              data: statisticsResponse.data.data,
            },
          });
          setLoading(false);
        }
      }, 5000)
    }
  }, [loading]);

  return (
    <Layout id="layout">
      <Header>header</Header>
      <Content id="layout-content">
        <Card id="search-parameters-card" bodyStyle={{ display: 'flex', alignItems: 'flex-end' }}>
          <div className="search-field-container">
            <p>Repository</p>
            <Input value={repository} onChange={event => setRepository(event.target.value)} />
          </div>
          <div className="search-field-container">
            <p>Owner username</p>
            <Input value={owner} onChange={event => setOwner(event.target.value)} />
          </div>
          <Button type="primary" loading={loading} onClick={() => setLoading(true)}>Search</Button>
        </Card>
        <SearchResults loading={loading} repositoryName={repository} />
      </Content>
    </Layout>
  );
};

export default Search;
