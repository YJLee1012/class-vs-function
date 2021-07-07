import React ,{useState, useEffect} from 'react';
import './App.css';

function App() {
  let [funcShow,setFuncShow] = useState(true);
  let [classShow,setClassShow] = useState(true);
  return (
    <div className="container">
      <h1>Hello World</h1>
      <input type="button" value="func" onClick={
        function(){
          setFuncShow(!funcShow)
        }
      }></input>
      <input type="button" value="class" onClick={
        function(){
          setClassShow(!classShow)
        }
      }></input>
      {funcShow ? <FuncComp initNumber={2}></FuncComp> : null}
      {classShow ? <ClassComp initNumber={2}></ClassComp> : null}
    </div>
  );
}

//함수형 훅 이용
let funStyle = 'color:blue';
let funId = 0;
function FuncComp(props){
  //useState사용
  let [number,setNumber] = useState(props.initNumber);
  let [date,setDate] = useState((new Date()).toString())

  //useEffect는 compoenentDidMount 와 componentDidUpdate와 같은 효과
  useEffect(function(){
    console.log('%cfunction => useEffect (componentDidMount & componentDidUpdate) '+ (++funId),funStyle);

    //clean up : return 이용
    //clean up 이 함수에 대한 내용을 실행한 것을 정리할때 return값을 호출해준다.
    return function(){
      console.log('%cfunction => useEffect return (componentDidMount & componentDidUpdate) '+ (++funId),funStyle);
    }
  })

  //컴포넌트가 최초생성될 때 딱 한번만 실행
  useEffect(function(){
    console.log('%cfunction => useEffect (componentDidMount) '+ (++funId),funStyle);
    return function(){
      console.log('%cfunction => useEffect return (componentWillUnMount) '+ (++funId),funStyle);
    }
  },[])

  //number변경될때 실행
  useEffect(function(){
    console.log('%cfunction => useEffect number (componentDidMount & componentDidUpdate) '+ (++funId),funStyle);
    return function(){
      console.log('%cfunction => useEffect number return (componentDidMount & componentDidUpdate) '+ (++funId),funStyle);
    }
  },[number])

  console.log('%cfunction => render '+ (++funId),funStyle);
  
  return(
    <div className="container">
      <h2>function style component</h2>
      <p>Number : {number}</p>
      <p>Date : {date}</p>
      <input type="button" value="random" onClick={
        ()=>{
          setNumber(Math.random());
        }
      }></input>
      <input type="button" value="date" onClick={
        ()=>{
          setDate((new Date()).toString());
        }
      }></input>
    </div>
  )
}

//클래스형
let classStyle = 'color:red';
class ClassComp extends React.Component{
  //state, setState 사용
  state = {
    number: this.props.initNumber,
    date : (new Date()).toString()
  }

  componentWillMount(){
    //%c는 클래스스타일주기위해
    console.log('%cclass => componentWillMount',classStyle);
  }
  componentDidMount(){
    console.log('%cclass => componentDidMount',classStyle);
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log('%cclass => shouldComponentUpdate',classStyle);
    return true;
  }
  componentWillUpdate(nextProps, nextState){
    console.log('%cclass => componentWillUpdate',classStyle);

  }
  componentDidUpdate(nextProps, nextState){
    console.log('%cclass => componentDidUpdate',classStyle);
  }
  componentWillUnmount(){
    console.log('%cclass => componentWillUnMount',classStyle);
  }
  //render 메소드
  render(){
    console.log('%cclass => render',classStyle);
    return(
      <div className="container">
        <h2>class style</h2>
        <p>Number : {this.state.number}</p>
        <p>Date : {this.state.date}</p>
        <input type="button" value="random" onClick={
          function(){
          //this.setState에 새로운값을 넘겨줘서 state 업데이트
          this.setState({number:Math.random()})
        }.bind(this)
        }></input>
        <input type="button" value="date" onClick={
          function(){
            this.setState({date:(new Date()).toString()})
          }.bind(this)
        }></input>
      </div>
    )
  }
}
export default App;

//클래스 라이프사이클
/**
compoenetWillMount()
컴포넌트가 생성되기 전에 처리 해야될 일이 있다면
componentWillMount() 라는 메소드 구현을 통해
컴포넌트 생성되기 직전. 즉 렌더가 호출되기 전에 해야 될 일을 실행
->
render()
렌더 메소드가 호출되면 마운트가 되는것. 화면에 그려짐
->
componentDidMount()
컴포넌트를 구현하는 개발자가 구현하는 걸 통해서
컴포넌트가 생성된 후에 해야 될 일을 처리할 수 있게 됨.

컴포넌트 생성

상태 변경시

shouldComponentUpdate(nextProps.nextState)
렌더를 호출할 필요가 있느냐 없느냐를 return
->
componentWillUpdate(nextProps,nextState)
->
render()
->
componentDidUpdate(prevProps,prevState)

컴포넌트 소멸
componentWillUnmount()
 */
