import React, { useState } from 'react'
import { Table, Select, Radio } from 'antd';
import searchImg from "../../assets/search.svg";
import './style.css';

const {Option}= Select;

function TransactionTable({transactions}) {

    const [sortKey,setSortKey]= useState("")
    const [search, setSearch]= useState("")
    const [typeFilter, setTypeFilter]= useState("")

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Amount (₹)',
          dataIndex: 'amount',
          key: 'amount',
        },
        {
          title: 'Tag',
          dataIndex: 'tag',
          key: 'tag',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
          },
          {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
          },
      ];
      
      let filterTransaction= transactions.filter((item)=>item.name.toLowerCase().includes(search.toLowerCase()) && item.type.includes(typeFilter) );

      let sortedTransactions = filterTransaction.sort((a,b)=>{
        if(sortKey === "amount"){
            return a.amount - b.amount;
        } else if(sortKey === "date"){
            return new Date(a.date)- new Date(b.date);
        } else { return 0; }
      });

      
      return (
          <div
             style={{width: "95%",padding: "0rem 2rem",}}>
      <div style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
          <div className='input-flex'>
          <img src={searchImg} width="18"/>
          <input value={search} onChange={e=> setSearch(e.target.value)} placeholder='Search by name'/>
          </div>
          <Select
           className="select-input"
           onChange={(value)=>{setTypeFilter(value)}}
           value={typeFilter}
           placeholder="Filter"
           allowClear
           >
            <Option value="">All</Option>
            <Option value="income">Income</Option>
            <Option value="expense">Expense</Option>
          </Select>
          </div>
          <div className="my-table">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: "1rem",
          }}
        >
          <h2>My Transactions</h2>

          <Radio.Group
            className="input-radio"
            onChange={(e) => setSortKey(e.target.value)}
            value={sortKey}
          >
            <Radio.Button value="">No Sort</Radio.Button>
            <Radio.Button value="date">Sort by Date</Radio.Button>
            <Radio.Button value="amount">Sort by Amount</Radio.Button>
          </Radio.Group>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              width: "400px",
            }}
          >
            <button className="btn">
              Export to CSV
            </button>
            <label for="file-csv" className="btn btn-blue">
              Import from CSV
            </label>
            <input
              id="file-csv"
              type="file"
              accept=".csv"
              required
              style={{ display: "none" }}
            />
          </div>
        </div>

        <Table columns={columns} dataSource={sortedTransactions} />
      </div>
    </div>
  )
}

export default TransactionTable;
