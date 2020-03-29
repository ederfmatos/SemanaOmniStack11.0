import React, { useEffect, useState, useCallback } from "react";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

import {
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  RefreshControl,
  ScrollView
} from "react-native";

import api from "../../services/api";

import styles from "./styles";

import logoImg from "../../assets/logo.png";

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadIncidents();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    await loadIncidents();

    setRefreshing(false);
  }, [refreshing]);

  function loadIncidents() {
    if (loading) {
      return;
    }

    if (total > 0 && incidents.length === total) {
      return;
    }

    setLoading(true);

    return new Promise(async resolve => {
      const response = await api.get("/incidents", { params: { page } });

      setIncidents([
        ...incidents,
        ...response.data.filter(
          item => !incidents.find(incident => incident.id === item.id)
        )
      ]);
      setTotal(response.headers["x-total-count"]);
      setLoading(false);
      setPage(page + 1);

      resolve();
    });
  }

  const navigation = useNavigation();

  function navigateToDetail(incident) {
    navigation.navigate("Detail", { incident });
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.header}>
            <Image source={logoImg} />
            <Text style={styles.headerText}>
              Total de <Text style={styles.headerTextBold}>{total}</Text> casos
            </Text>
          </View>

          <Text style={styles.title}> Bem vindo</Text>
          <Text style={styles.description}>
            Escolha um dos casos abaixo e salve o dia
          </Text>
        </ScrollView>
      </SafeAreaView>

      <FlatList
        data={incidents}
        style={styles.IncidentsList}
        keyExtractor={incident => String(incident.id)}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG: </Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProperty}>Caso: </Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>Valor: </Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRl"
              }).format(incident.value)}
            </Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigateToDetail(incident)}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>

              <Feather name="arrow-right" size={16} color="#e02041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
