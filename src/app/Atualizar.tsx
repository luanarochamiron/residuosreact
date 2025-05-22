import { View, Button, StyleSheet, Alert, Platform, Text, TouchableOpacity, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { useResiduosDataBase } from "@/database/useResiduosDataBase";
import { useNavigation } from "expo-router";
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute } from '@react-navigation/native';

export default function Atualizar() {
  const navigation = useNavigation();
  const residuosDataBase = useResiduosDataBase();
  const route = useRoute();
  const { item } = route.params;

  const [id, setId] = useState("");
  const [data, setData] = useState("");
  const [categoria, setCategoria] = useState("");
  const [peso, setPeso] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const categorias = [
    "Não reciclável",
    "Reciclável",
    "Óleo",
    "Tampinhas plásticas",
    "Lacres de alumínio",
    "Tecidos",
    "Meias",
    "Material de escrita",
    "Esponjas",
    "Eletrônicos",
    "Pilhas e baterias",
    "Infectante",
    "Químicos",
    "Lâmpada fluorescente",
    "Tonners de impressora",
    "Esmaltes",
    "Cosméticos",
    "Cartela de medicamento",
  ];

  // Preenche os campos com os dados recebidos via params
  useEffect(() => {
    if (item) {
      setId(item.id.toString());
      setData(item.data);
      setCategoria(item.categoria);
      setPeso(item.peso.toString());
    }
  }, [item]);

  function onChangeDate(event: any, selectedDate: Date) {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      const formato = selectedDate.toISOString().split("T")[0];
      setData(formato);
    }
  }

  async function atualizar() {
    try {
      await residuosDataBase.atualizar({
        id: Number(id),
        data,
        categoria,
        peso,
      });

      Alert.alert("Sucesso!", "Dados atualizados com sucesso!", [
        {
          text: "Ok",
          onPress: () => navigation.navigate("Consultar"),
        },
      ]);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro ao atualizar");
    }
  }

  return (
    <View style={styles.container}>

      {/* Data com calendário */}
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.dateInput}
      >
        <Text style={{ fontSize: 16 }}>{data || "Selecione a data"}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={data ? new Date(data) : new Date()}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}

      {/* Picker de Categoria */}
      <Picker
        selectedValue={categoria}
        onValueChange={(itemValue) => setCategoria(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione a categoria" value="" />
        {categorias.map((cat, index) => (
          <Picker.Item key={index} label={cat} value={cat} />
        ))}
      </Picker>

      {/* Campo de Peso */}
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={peso}
        onChangeText={(text) => {
          let formatted = text.replace(',', '.');
          formatted = formatted.replace(/[^0-9.]/g, '');

          const parts = formatted.split('.');
          if (parts.length > 2) {
            formatted = parts[0] + '.' + parts[1];
          }

          if (parts.length === 2) {
            formatted = parts[0] + '.' + parts[1].substring(0, 3);
          }

          setPeso(formatted);
        }}
        placeholder="Digite o peso (ex: 12.345)"
      />

      <Button title="Atualizar" onPress={atualizar} />
      <Button title="Voltar" onPress={() => navigation.navigate("Consultar")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#989898",
    justifyContent: "center",
    alignItems: "center",
  },
  picker: {
    width: 300,
    height: 50,
    backgroundColor: "white",
    marginBottom: 20,
  },
  dateInput: {
    width: 300,
    height: 50,
    backgroundColor: "white",
    justifyContent: "center",
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  input: {
    width: 300,
    height: 50,
    backgroundColor: "white",
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});
