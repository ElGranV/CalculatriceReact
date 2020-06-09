// Components/Search.js

import React from 'react'
import { View,Text,  TextInput, Button, Image, StyleSheet, TouchableOpacity } from 'react-native'
function isOperator(letter)
{return (letter === "+" || letter ==="-" || letter ==="÷" || letter === "×")}

function canAddComa(nb)
{
  let can = true;
  for (let letter of nb)
  {
    if (letter === ",") can = false;
    if (letter === "+" || letter ==="-" || letter ==="÷" || letter === "×") can = true;

  }
  return can;
}
function isNumber(number)
{
  for (let letter of number)
  {
    if ((letter < "0" || letter > "9") && letter !==",") return false;
  }return true;
}
function formatted(str)
{
  let s = "";
  for (let letter of str)
  {
    if (letter==="×") s+="*";
    else
    {
      if (letter==="÷")s+="/";
      else s+= letter;
    }
  }
  return s;
}

class Touche extends React.Component
{
  static defaultTouchStyle = {
    flex : 1
  }
  static defaultTextStyle = {
    color : "rgb(97, 169, 99)",
    fontSize : 30,
    alignSelf: "center"
  }

  constructor(props)
  {
    super(props);
  }

  render ()
  {
    return(
    <TouchableOpacity style = {this.props.style || Touche.defaultTouchStyle} onPress = {this.props.onPress ||null}>
      <Text  style = {this.props.textStyle || Touche.defaultTextStyle}>
        {this.props.title || ""}
      </Text>
    </TouchableOpacity>
    )
  }
}




class VuePrincipale extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state = {
      text : "",
      result: ""
    }
  }
  addNumber(nb)
  {
    if (this.state.text.length<15) 
    {
      this.setState({result : ""})
      if (nb===",")
      {
        if (canAddComa(this.state.text))
        {
          if (this.state.text.length===0 || !isNumber(this.state.text[this.state.text.length-1])) nb = "0"+ nb;
          this.setState({text : this.state.text + nb})
        }
      }

      else
      {
        if (isOperator(nb) && this.state.text.length > 0)
        {
          if (isOperator(this.state.text[this.state.text.length-1]))
          {
            this.setState({text: this.state.text.substring(0, this.state.text.length-1)+nb})
          }else
          {
            this.setState({text : this.state.text + nb});  
          }
        }else
        {
          let evalExp = (isNumber(this.state.text))?()=>{}:()=> this.setState({result: eval(formatted(this.state.text)).toString()});
          this.setState({text : this.state.text + nb}, evalExp);
        }
      }
    }
  }
  removeNumber()
  {
    if (this.state.text.length > 0) this.setState({text : this.state.text.substring(0, this.state.text.length-1)});
    if (isNumber(this.state.text[this.state.text.length-1])) this.setState({result: eval(formatted(this.state.text)).toString()})
    else this.setState({result: ""});
  }
  operator(op)
  {
    this.addNumber(op)

  }
  render()
    {
        return(
        <View style={styles.main_container}>
          <View style = {styles.top_view}>
            <Text style={styles.champDeSaisie}>{this.state.text+"\n"+this.state.result}</Text>
          </View>
          <View style = {styles.bottom_view}>
            <View style = {styles.line}>
              <Touche title="7" onPress = {() => {this.addNumber(7)}}/>
              <Touche title="8" onPress = {() => {this.addNumber(8)}}/>
              <Touche title="9" onPress = {() => {this.addNumber(9)}}/>
              <Touche title="÷" onPress = {() => {this.addNumber("÷")}}/>
              <Touche title="<x" textStyle={styles.rightTouchText} style = {{flex : 1, backgroundColor: "rgb(97, 169, 99)", borderTopLeftRadius : 40}} onPress = {()=> this.removeNumber()}/>
            </View>
            <View style = {styles.line}>
              <Touche title="4" onPress = {() => {this.addNumber(4)}}/>
              <Touche title="5" onPress = {() => {this.addNumber(5)}}/>
              <Touche title="6" onPress = {() => {this.addNumber(6)}}/>
              <Touche title="×" onPress = {() => {this.addNumber("×")}}/>
              <Touche title="C" textStyle={styles.rightTouchText} style = {styles.rightTouch}/>
            </View>
            <View style = {styles.line}>
              <Touche title="1" onPress = {() => {this.addNumber(1)}}/>
              <Touche title="2" onPress = {() => {this.addNumber(2)}}/>
              <Touche title="3" onPress = {() => {this.addNumber(3)}}/>
              <Touche title="-" onPress = {() => {this.addNumber("-")}}/>
              <Touche title="🖩" textStyle = {styles.rightTouchText} style = {styles.rightTouch}/>
            </View>
            <View style = {styles.line}>
              <Touche title="," onPress = {() => {this.addNumber(",")}}/>
              <Touche title="0" onPress = {() => {this.addNumber(0)}}/>
              <Touche title=""/>
              <Touche title="+" onPress = {() => {this.addNumber("+")}}/>
              <Touche title="=" style = {styles.equalSymbol}/>
            </View>
          </View>
        </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        main_container:
        {
          flex : 1,
          flexDirection : 'column'
        },
        top_view:
        {
          flex : 1
        },
        bottom_view:
        {
          flex : 1,
          flexDirection : "column",
          backgroundColor : 'rgb(233, 249, 238)'
        },
        line:
        {
          flex : 1,
          //borderColor: "black",
          //borderWidth: 2,
          flexDirection : "row",
          justifyContent : "space-around"
        }, 
        rightTouch:
        {
          backgroundColor : "rgb(97, 169, 99)",
          flex : 1,
          
        },
        rightTouchText:
        {
          color : "white",
          fontSize : 30,
          alignSelf : "center"
        },
        equalSymbol:
        {
          backgroundColor: "rgb(255, 213, 79)",
          flex: 1,
          borderTopLeftRadius : 40,
          borderTopRightRadius : 40,
          borderBottomLeftRadius : 40,
          paddingTop: 7
        },
        champDeSaisie:
        {
          flex:1,
          textAlign : "right",
          textAlignVertical : "center",
          fontSize : 45,
          paddingBottom : 5
        }
        
    }

);

export default VuePrincipale;
