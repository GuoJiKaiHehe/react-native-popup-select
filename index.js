import React, {Component} from 'react';
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	PixelRatio
} from 'react-native';

import {
	Toast,
	TabView,
	NavigationBar,
	Carousel,
	Overlay,
} from 'teaset';
global.ONE_PX = 1 / PixelRatio.get();

export default {
	show(items=[],options={}){
		let overlayView = (
		  <Overlay.PullView side='bottom' modal={false}>
		    <View style={{backgroundColor: '#fff', width:'100%', 
		    minHeight: 260,}}>
		     	<SelectContent 
		     	items={items} 
		     	{...options}
		     	onClose={()=>{
					Overlay.hide(this.overlay_key);
		     	}}
		     	 />
		    </View>
		  </Overlay.PullView>
		);
		this.overlay_key = Overlay.show(overlayView);
	},
	hide(){
		Overlay.hide(this.overlay_key);
	}
}
var styles={
	head_btn:{
		width:80,
		alignItems:'center',justifyContent:'center',
	}
}
class SelectContent extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	selectedColor:"#ccc",
	  	selectIndex:null,
	  };
	}
	render(){
		var {title,onCancel,onConfirm,items,onPress}=this.props
		return (
			<View style={{flex:1}}>
				{title
			     ?<View style={{height:44,
				     	alignItems:'center',
				     	flexDirection:"row",
				     	justifyContent:'space-between',
				     	backgroundColor:'#fff'}}>
				     	<TouchableOpacity
				     	onPress={()=>{
				     		this.props.onClose && this.props.onClose();
							onCancel && onCancel()
				     	}}
				     	style={styles.head_btn}
				     	><Text style={{color:PRIMARY_COLOR}}>Cancel</Text></TouchableOpacity>
				     	<Text style={{color:"#2B2B2B",fontWeight:'600',fontSize:14}}>{title}</Text>
				     	{onConfirm ? <TouchableOpacity
				     	onPress={()=>{
				     		if(items[this.state.selectIndex]){
				     			onConfirm && onConfirm(items[this.state.selectIndex])
				     			this.props.onClose && this.props.onClose();
				     		}
				     	}}
				     	style={styles.head_btn}
				     	><Text style={{color:PRIMARY_COLOR}}>Confirm</Text></TouchableOpacity>:<View style={styles.head_btn}/>}
				   </View>
			   		:null
		     }

		     <ScrollView>
		     	{
		     	items.map((item,index)=>{
					return (
						<TouchableOpacity 
						key={index} 
						style={{color:'#fff',
						height:44,
						borderColor:"#ccc",
						borderTopWidth:ONE_PX,
						backgroundColor:this.state.selectIndex==index?"#F2F2F2":'#fff',
						justifyContent:'center',alignItems:'center'}}
						onPress={()=>{
							onPress && onPress(item);
							if(title){
								this.setState({
									selectIndex:index, //选择中的索引；
								});
							}else{
								this.props.onClose && this.props.onClose()
							}
						}}>
							<Text stylle={{fontSize:14,fontWeight:'400',color:"#2b2b2b"}}>{item.title}</Text>
						</TouchableOpacity>
						)
		     	})
		     }
		     </ScrollView>
			</View>
			)
	}
}




