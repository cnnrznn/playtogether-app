import { StyleSheet, View, Text, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import {v4 as uuid} from 'uuid';


const Form = (props) => {
    const submitCallback = props.callback;

    const [id, setID] = useState(uuid());

    const [selectedActivity, setSelectedActivity] = useState("volleyball");
    const [selectedTime, setSelectedTime] = useState(60);

    const [lat, setLat] = useState();
    const [lon, setLon] = useState();
    const [location, setLocation] = useState();

    // this is here for demo purposes
    // in a release version a UUID would be generated once
    // and stored on-device
    function changeUUID() {
        setID(uuid());
    }

    function submitForm() {
        submitCallback({
            time: selectedTime,
            activity: selectedActivity,
            latitude: lat,
            longitude: lon,
            location: location,
        });
    }

    function GetLocation() {
        Geolocation.getCurrentPosition(
            (position) => {
            console.log(position);
            setLat(position.coords.latitude);
            setLon(position.coords.longitude);
            setLocation(position.coords);
            },
            (error) => {
            console.log(error);
            }
        );
    }

    return (
        <View>
            <View style={styles.row}>
                <Text>Lat: {lat}</Text>
                <Text>Lon: {lon}</Text>
                <Button onPress={GetLocation} title="Get Locatoin" />
            </View>
            <View style={styles.row}>
                <Text>ID: {id}</Text>
                <Button onPress={changeUUID} title='Change UUID'/>
            </View>
            <View style={styles.row} >
                <Text style={styles.col}>Activity:</Text>
                <Picker
                    selectedValue={selectedActivity}
                    onValueChange={(activity, index) => setSelectedActivity(activity)} >
                    <Picker.Item label="volleyball" value="volleyball" />
                    <Picker.Item label="run" value="run" />
                </Picker>
            </View>
            <View style={styles.row} >
                <Text style={styles.col}>Time:</Text>
                <Picker
                    selectedValue={selectedTime}
                    onValueChange={(time, index) => setSelectedTime(time)} >
                    <Picker.Item label="1 hour" value={60} />
                    <Picker.Item label="2 hours" value={120} />
                    <Picker.Item label="3 hours" value={180} />
                    <Picker.Item label="4 hours" value={240} />
                </Picker>
            </View>
            <Button 
                onPress={submitForm}
                title="Go!"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    col: {
        paddingEnd: 10,
    }

});

export default Form;