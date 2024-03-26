import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  CircularProgress,
} from "@mui/material";

const TagsBrowser = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageSize, setPageSize] = useState(5);
  const [sortField, setSortField] = useState("count");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.stackexchange.com/2.3/tags?order=${sortOrder}&sort=popular&site=stackoverflow&pagesize=${pageSize}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTags(data.items);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [pageSize, sortOrder, sortField]);

  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value, 10));
  };

  const handleSortFieldChange = (event) => {
    setSortField(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <TextField
        label="Page Size"
        type="number"
        value={pageSize}
        onChange={handlePageSizeChange}
      />
      <TextField
        select
        label="Sort Field"
        value={sortField}
        onChange={handleSortFieldChange}
        SelectProps={{
          native: true,
        }}
      >
        <option value="count">Count</option>
        <option value="name">Name</option>
      </TextField>
      <TextField
        select
        label="Sort Order"
        value={sortOrder}
        onChange={handleSortOrderChange}
        SelectProps={{
          native: true,
        }}
      >
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </TextField>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tags.map((tag) => (
              <TableRow key={tag.name}>
                <TableCell>{tag.name}</TableCell>
                <TableCell>{tag.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TagsBrowser;
