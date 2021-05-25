import logo from './logo.svg';
import './App.css';
import React from "react"
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const regression = require('regression')


function calLinear(n,arr_xy,x) {
  let arr = arr_xy
  // console.log(arr_xy);
  // console.log(arr);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < 2; j++) {
        arr[i][j] = parseInt(arr[i][j])
      }

  }
  
  const result = regression.linear(arr);
  let XX = x
  const a1 = parseFloat(result.equation[0]);
  const a0 = parseFloat(result.equation[1]);
  // console.log(arr_xy)
  // console.log(XX)
  // console.log(a0)
  // console.log(a1)
  let ans = []
  ans.push(<div>f({XX}) = {(a0+(a1*XX))}</div>) 
  return ans
}


class App extends React.Component {
  state = {
    martrixy: [[],[]],
    row: 2,
    vlueX:"",
    data: [{ x: 10, y: 5 }, { x: 15, y: 9 }, { x: 20, y: 43 }],
    result:""
  }

  async getdata(){
    let tempData = null
    await axios.get("https://my-json-server.typicode.com/Katoumat123/testsomething/regress").then(res => {tempData = res.data})
    // console.log(tempData);
    this.setState({row: tempData[0]["n"],martrixy: tempData[0]["xy"],vlueX: tempData[0]["x"]});
  }
   
  getapi = e =>{
    this.getdata()
  }

  addmartrix = e => {
    if (this.state.row < 6) {
      this.state.martrixy.push([])
      this.setState({ row: this.state.row + 1 })
      // console.log(this.state.row);
      //console.log(this.state.vlueX);
    }
  }

  delmartrix = e => {
    if (this.state.row > 2) {
      this.state.martrixy.pop()
      this.setState({ row: this.state.row - 1 })
      // console.log(this.state.row);
    }
  }

  onChangeXY = e =>{
    let doit = this.state.martrixy
    let cut = e.target.name.split("_")
    // console.log(cut);
    doit[parseInt(cut[0])][parseInt(cut[1])] = e.target.value
    this.setState({martrixy:doit})
    //console.log(e.target.value);
    // console.log(this.state.martrixy);
   
  }
  

  buildmatrixXY() {
    let matrixXY = []
    let row = this.state.row
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < 2; j++) {
        matrixXY.push(<span><input style ={{width:"45%"}} placeholder={i + "" + j} name ={i+"_"+j} onChange ={this.onChangeXY} value ={this.state.martrixy[i][j]}></input></span>)
      }
      
    }
    //console.log(matrixXY);
    return matrixXY;
    
  }

  onChangevalueX = e =>{
    this.setState({vlueX: e.target.value})
  }


  calvalue = e => {
    //console.log(this.state.vlueX);
    // console.log(matrix);
    this.setState({

      result: calLinear(this.state.row,this.state.martrixy,this.state.vlueX)

    });
  }


  render() {
    return (
      <div>
        <h1>Linear</h1>
        <div>
          <span>
            <button onClick={this.addmartrix}>ADD</button>
            <button onClick={this.delmartrix}>DEL</button>

          </span>
        </div>
        <span>{this.buildmatrixXY()}</span><br />
        <span>X:<input onChange={this.onChangevalueX} value ={this.state.vlueX}></input></span>
        <div>
          <button onClick={this.calvalue}>คำนวณ</button>
          <button onClick={this.getapi}>ตัวอย่าง</button>
        </div>
        {this.state.result}
        <div>
          <LineChart
            width={700}
            height={300}
            data={this.state.data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="y" stroke="#8884d8" activeDot={{ r: 8 }} />
            {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
          </LineChart>
        </div>
      </div>

    );
  }
}

export default App;