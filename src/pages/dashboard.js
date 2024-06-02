import React, { useEffect, useState } from 'react';
import Header from '../components/headers/header';
import Cards from "../components/cards/card"; 
import AddIncomeModal from "../components/modals/addIncomeModal";
import AddExpenseModal from "../components/modals/addExpenseModal";
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, addDoc, query, getDocs } from "firebase/firestore";
import { auth, db } from '../firebase'; 
import { toast } from 'react-toastify'; 
import TransactionTable from '../components/transactiontable/transactiontable';

function Dashboard() {

  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [user]= useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };
  
  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

  function onFinish(values, type) {
    const amount = Number(values.amount);
    const newTransaction= {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      amount: amount,
      tag: values.tag,
      name: values.name
    }
    addTransaction(newTransaction);
    currentBalance();
  }

  async function addTransaction(transaction) {

    try {
      const docRef = await addDoc(collection(db, `users/${user.uid}/transactions`), transaction);
      console.log("documentation written with", docRef.id);
      toast.success("Transaction Added!")
      let newArray = transactions;
      newArray.push(transaction);
      setTransactions(newArray);
      currentBalance();
    } catch (error) {
      toast.error("Couldn't add transaction");
    }
  }

  
  function currentBalance(){
    let totalIncome=0;
    let totalExpense=0;
    
    transactions.forEach((transaction)=>{
      if(transaction.type==="income"){
        totalIncome+=transaction.amount;
      }
      else {
        totalExpense+=transaction.amount;
      }
      setIncome(totalIncome);
      setExpense(totalExpense);
      setBalance(totalIncome-totalExpense);
    })
    
  }
  
  useEffect(() => {
    currentBalance();
  }, [transactions]);

  useEffect(() => {
    fetchTransactions();
  }, [user]);

   async function fetchTransactions() {
    if(!user) return;
     setLoading(true);
      if(user){
        const q = query(collection(db, `users/${user.uid}/transactions`));
        const querySnapshot = await getDocs(q);
        let transactionArray=[];
        querySnapshot.forEach((doc) => {
        console.log("fetched the array ",transactionArray);
        transactionArray.push(doc.data());
});
   setTransactions(transactionArray);
   toast.success("All Transactions fetched"); }
   setLoading(false);
  }

  return (
    <div>

      <Header />

      { loading? <p>Loading...</p> : <>
      <Cards 
      showExpenseModal={showExpenseModal}
      showIncomeModal={showIncomeModal}
      income={income}
      expense={expense} 
      balance={balance} />

      <AddIncomeModal 
      isIncomeModalVisible={isIncomeModalVisible}
      handleIncomeCancel={handleIncomeCancel}
      onFinish={onFinish}/>

      <AddExpenseModal 
      isExpenseModalVisible={isExpenseModalVisible}
      handleExpenseCancel={handleExpenseCancel}
      onFinish={onFinish}/>
      </> }

      <TransactionTable transactions={transactions} />

    </div>
  )
}

export default Dashboard;
