import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";

async function fetchTiktokAccounts(auth: string): Promise<{username: string}[]> {
  // Gọi API Golike thực tế tại đây, hiện đang demo dữ liệu giả
  return [
    { username: "tiktok_user_1" },
    { username: "tiktok_user_2" }
  ];
}

export default function App() {
  const [authorization, setAuthorization] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const [tiktokAccount, setTiktokAccount] = useState("");
  const [accounts, setAccounts] = useState<{username: string}[]>([]);

  const handleEnableToggle = async () => {
    setIsEnabled(!isEnabled);
    if (!isEnabled && authorization) {
      const accs = await fetchTiktokAccounts(authorization);
      setAccounts(accs);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.green}
        placeholder="Nhập Authorization Golike"
        value={authorization}
        onChangeText={setAuthorization}
      />
      <TouchableOpacity style={styles.blue} onPress={handleEnableToggle}>
        <Text style={{color: "#fff", fontWeight: "bold"}}>{isEnabled ? "Tắt" : "Bật"}</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.yellow}
        placeholder="Tài khoản TikTok"
        value={tiktokAccount}
        onChangeText={setTiktokAccount}
      />
      <View style={styles.red}>
        <Text style={{color: "#fff", fontWeight: "bold"}}>Danh sách acc TikTok liên kết:</Text>
        <FlatList
          data={accounts}
          keyExtractor={item => item.username}
          renderItem={({item}) => (
            <Text style={{color: "#fff"}}>{item.username}</Text>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 20,
    flex: 1,
    backgroundColor: "#fff"
  },
  green: {
    borderWidth: 2,
    borderColor: "#158a31",
    backgroundColor: "#25c43a",
    color: "#fff",
    padding: 15,
    fontSize: 18,
    marginBottom: 10,
    borderRadius: 8,
  },
  blue: {
    borderWidth: 2,
    borderColor: "#2469c8",
    backgroundColor: "#22b6fc",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  yellow: {
    borderWidth: 2,
    borderColor: "#a2920e",
    backgroundColor: "#ffe600",
    color: "#444",
    padding: 14,
    fontSize: 18,
    marginBottom: 10,
    borderRadius: 8,
  },
  red: {
    borderWidth: 2,
    borderColor: "#c81a1a",
    backgroundColor: "#f91c1c",
    padding: 18,
    borderRadius: 8,
    minHeight: 150,
    marginTop: 10,
  },
});
