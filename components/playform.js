import { StyleSheet, View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';

const Form = () => {
    const [selectedActivity, setSelectedActivity] = useState();
    const [selectedTime, setSelectedTime] = useState();

    return (
        <View>
            <View style={styles.row} >
                <Text style={styles.col}>Activity:</Text>
                <Picker
                    selectedValue={selectedActivity}
                    onValueChange={activity => setSelectedActivity(activity)} >
                    <Picker.Item label="volleyball" value="volleyball" />
                    <Picker.Item label="run" value="run" />
                </Picker>
            </View>
            <View style={styles.row} >
                <Text style={styles.col}>Time:</Text>
                <Picker
                    selectedValue={selectedTime}
                    onValueChange={time => setSelectedTime(time)} >
                    <Picker.Item label="1 hour" value={60} />
                    <Picker.Item label="2 hours" value={240} />
                </Picker>
            </View>
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