import { StyleSheet, View, Text, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';



const Form = (props) => {
    const submitCallback = props.callback;

    const [selectedActivity, setSelectedActivity] = useState("volleyball");
    const [selectedTime, setSelectedTime] = useState(60);

    function submitForm() {
        submitCallback({
            time: selectedTime,
            activity: selectedActivity,
        });
    }

    return (
        <View>
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