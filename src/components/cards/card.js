import React from 'react'
import { Card, Row } from 'antd';
import "./card.css"
import Button from '../buttons/button';


function Cards({showExpenseModal, showIncomeModal, income, expense, balance}) {
  return (
    <div>
    <Row className='my-row'>
<Card 
      className='my-card' 
      title="Current Balance" 
      bordered={true}><p>₹ {balance}</p>
      <Button text="Reset Balance" blue="true" /></Card>

<Card 
      className='my-card' 
      title="Current Expense" 
      bordered={true}><p>₹ {expense}</p>
      <Button text="Reset Expense" blue="true" onClick={showExpenseModal} /></Card>

<Card 
      className='my-card'  
      title="Current Income" 
      bordered={true}><p>₹ {income}</p>
      <Button text="Reset Income" blue="true" onClick={showIncomeModal} /></Card>
    </Row>
    </div>
  )
}

export default Cards;
