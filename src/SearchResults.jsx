import { Card, Spin } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';

import './SearchResults.scss'

const SearchResults = ({ loading, repositoryName }) => {
  const repositoryData = useSelector(repositories => repositories[repositoryName]);

  if (loading) {
    return (
      <div id="search-results-empty-container">
        <Card>
          <Spin />
        </Card>
      </div>
    );
  }

  if (!repositoryData) {
    return (
      <div id="search-results-empty-container">
        <Card>
          No results to be displayed
        </Card>
      </div>
    );
  }

  console.log(repositoryData.contributors);
  return (
    <>
      {repositoryData.fullyLoaded ?
        <h1 id="header-synchonization-done">SYNCHRONIZED</h1>
        : <h1 id="header-synchonization-in-progress">SYNCHRONIZATION IN PROGRESS</h1>}
      <div id="search-results-container">
        <Card className="search-results-card" title="Commits">
          {repositoryData.contributors.sort((a, b) => {
            if (a.commits < b.commits) return 1;
            else if (a.commits === b.commits) return 0;
            else return -1;
          }).slice(0, 10).map(contribution => (
            <div className="statistics-item">
              <p>{contribution.username}</p>
              <p>{contribution.commits} commits</p>
            </div>
          ))}
        </Card>
        <Card className="search-results-card" title="Additions">
          {repositoryData.contributors.sort((a, b) => {
            if (a.added < b.added) return 1;
            else if (a.added === b.added) return 0;
            else return -1;
          }).slice(0, 10).map(contribution => (
            <div className="statistics-item">
              <p>{contribution.username}</p>
              <p>{contribution.added} additions</p>
            </div>
          ))}
        </Card>
        <Card className="search-results-card" title="Deletions">
          {repositoryData.contributors.sort((a, b) => {
            if (a.removed < b.removed) return 1;
            else if (a.removed === b.removed) return 0;
            else return -1;
          }).slice(0, 10).map(contribution => (
            <div className="statistics-item">
              <p>{contribution.username}</p>
              <p>{contribution.removed} deletions</p>
            </div>
          ))}
        </Card>
      </div>
    </>
  );
}

export default SearchResults;