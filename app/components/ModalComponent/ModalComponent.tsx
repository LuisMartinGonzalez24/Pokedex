import React from 'react'
import { View, Modal, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { globalThemes } from '../../theme/globalThemes';
import { styles } from './styles';

interface ModalComponentProps {
    setVisible: boolean;
    cancelCallback: () => void;
    actionCallback: () => void;
}

const ModalComponent = ({ setVisible, cancelCallback, actionCallback }: ModalComponentProps) => {
    return (
        <Modal
            animationType='fade'
            visible={setVisible}
            transparent
        >
            <View style={[styles.container]}>
                <View style={[styles.containerContent]}>
                    <Icon name={'pokeball'} color={'white'} size={45} style={{
                        alignSelf: 'center'
                    }} />
                    <Text style={[styles.message, globalThemes.pv10]}>
                        Do you want empty favorite list?
                    </Text>

                    <View style={[styles.buttonContent, globalThemes.pt8]}>
                        <TouchableOpacity
                            onPress={cancelCallback}
                            activeOpacity={0.7}
                            style={[styles.buttonAction, globalThemes.ph10, globalThemes.pv4]}
                        >
                            <Text style={[styles.buttonText]}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={actionCallback}
                            activeOpacity={0.7}
                            style={[styles.buttonAction, globalThemes.ph10, globalThemes.pv4]}
                        >
                            <Text style={[styles.buttonText]}>Yes, delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ModalComponent;