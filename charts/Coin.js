import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  Card,
  CardItem,
  Left,
  Right,
  Body,
  Text,
  Thumbnail,
  Spinner,
  View
} from "native-base";
import { LineChart } from "react-native-svg-charts";
import { PropTypes } from "prop-types";
import Axios from 'axios'

const data = [23,-23,231,3882,9928,82]

class Coin extends Component {
  

  




  chooseStyle() {
    
      return styles.priceDown;
   
  }

  render() {
   

    const style = this.chooseStyle();

    const cardHeader = (
      <View>



      <CardItem style={{ backgroundColor: "#282c34" }}>
        <Left >
         <Text style={{ fontSize: 20,}}>rank # {this.props.rank}</Text>
        </Left>

      

      </CardItem>

<View style={{flexDirection: 'row',padding:10}}>
      
      
         <View style={{backgroundColor:'gray',borderWidth:.5,borderColor:'gray',width:50,height:50,borderRadius:100,justifyContent:'center',alignItems: 'center',marginLeft:5}}>
         <Text style={{color:'white',fontSize:16,fontWeight:'bold'}}>{this.props.symbol.substring(0,1)}</Text>
         </View>       
        
        
        
         <View style={{left:5,top:10}}>
         <Text style={{color:'white',fontSize:15,}}>{this.props.symbol}/USD</Text>
         </View>
       

        </View>


      </View>

    );

    let cardBody = <Spinner />; // Loading State
    let cardFooter = false;


      cardBody = (
        <View style={styles.view}>
          <LineChart
            data={[this.props.change_percentage_of_90days,this.props.change_percentage_of_60days,this.props.change_percentage_of_30days,this.props.change_percentage_of_7days,this.props.change_percentage_of_24hr,this.props.change_percentage_of_1hr]}
            style={styles.chart}
            svg={{ stroke: style.color, strokeWidth: 3 }}
          />
        </View>
      );

      cardFooter = (
        <CardItem footer style={{ backgroundColor: "#282c34" }}>
          <Left>
            <Text style={style}>{this.props.changePercent.toFixed(5)}%</Text>
          </Left>
          <Body />
          <Right>
            <Text style={style}>${this.props.price.toFixed(5)}</Text>
          </Right>
        </CardItem>
      );
    

    

    return (
      <Card style={{ backgroundColor: "#282c34" }}>
        {cardHeader}
        <CardItem style={{ backgroundColor: "#282c34" }}>{cardBody}</CardItem>
        {cardFooter}
      </Card>
    );
  


  

  }
}

export default Coin;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    height: 75,
    backgroundColor: "#282c34"
  },
  chart: {
    height: 75,
    backgroundColor: "#282c34"
  },
  priceUp: {
    color: "rgb(0,153,51)"
    // color: "#ed6ac3"
  },
  priceDown: {
    // color: 'rgb(204,51,51)',
    color: "#ed6ac3"
  }
});

Coin.propTypes = {
  baseAsset: PropTypes.string,
  quoteAsset: PropTypes.string,
  interval: PropTypes.string
};
