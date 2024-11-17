import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";

export default function MobileDashboard() {
  const [selectedFactory, setSelectedFactory] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const factoryData = [
    { value: "factory1", label: "Tea Factory 1" },
    { value: "factory2", label: "Tea Factory 2" },
  ];

  const tempData = {
    totalQuantity: "100 KG",
    lastProvided: "12-08-2024",
  };

  interface Factory {
    value: string;
    label: string;
  }

  interface TempData {
    totalQuantity: string;
    lastProvided: string;
  }

  interface PastEntry {
    key: string;
  }

  const handleDateChange = (event: DateTimePickerEvent, date?: Date | undefined): void => {
    setShowDatePicker(false);
    if (date) setSelectedDate(date);
  };

  return (
    <View className="flex-1 p-4 bg-gray-50">
      {/* Dashboard Header */}
      <Text className="text-2xl font-bold text-center text-gray-800 mb-4">
        Dashboard
      </Text>

      {/* Current Total Quantity & Last Date Provided */}
      <View className="flex-row justify-between mb-6">
        <View className="flex-1 bg-green-100 p-4 rounded-lg mr-2">
          <Text className="text-base font-semibold text-gray-700">
            Current Total Quantity
          </Text>
          <Text className="text-2xl font-bold text-green-700 mt-2">
            {tempData.totalQuantity}
          </Text>
          <Text className="text-sm text-gray-500 mt-1">for This Month</Text>
        </View>
        <View className="flex-1 bg-blue-100 p-4 rounded-lg ml-2">
          <Text className="text-base font-semibold text-gray-700">
            Last Date
          </Text>
          <Text className="text-2xl font-bold text-blue-700 mt-2">
            {tempData.lastProvided}
          </Text>
          <Text className="text-sm text-gray-500 mt-1">
            you provided tea
          </Text>
        </View>
      </View>

      {/* Factory Selection */}
      <Text className="text-lg font-semibold text-gray-800 mb-2">
        Select Your Tea Factory
      </Text>
      <View className="bg-white rounded-lg shadow-sm">
        <Picker
          selectedValue={selectedFactory}
          onValueChange={(value) => setSelectedFactory(value)}
        >
          <Picker.Item label="Select a Factory" value={null} />
          {factoryData.map((factory) => (
            <Picker.Item
              key={factory.value}
              label={factory.label}
              value={factory.value}
            />
          ))}
        </Picker>
      </View>

      {selectedFactory && (
        <>
          {/* Next Date Picker */}
          <Text className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Next Date You Plan to Provide Tea
          </Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            className="bg-gray-200 p-4 rounded-lg"
          >
            <Text className="text-base text-gray-700">
              {selectedDate.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              minimumDate={new Date()}
              onChange={handleDateChange}
            />
          )}

          {/* Action Buttons */}
          <View className="flex-row justify-between mt-6">
            <TouchableOpacity className="flex-1 bg-green-600 py-4 mx-1 rounded-lg items-center">
              <Text className="text-white font-semibold">Apply Tea Powder</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-blue-600 py-4 mx-1 rounded-lg items-center">
              <Text className="text-white font-semibold">Apply Advance</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-yellow-600 py-4 mx-1 rounded-lg items-center">
              <Text className="text-white font-semibold">
                Apply Fertilizer
              </Text>
            </TouchableOpacity>
          </View>

          {/* Past Tea Providing Status */}
          <Text className="text-lg font-semibold text-gray-800 mt-8 mb-4">
            Past Tea Providing Status
          </Text>
          <FlatList
            data={[{ key: "Entry 1" }, { key: "Entry 2" }]}
            renderItem={({ item }) => (
              <Text className="text-base text-gray-700 py-2 px-4 border-b border-gray-200">
                {item.key}
              </Text>
            )}
            keyExtractor={(item) => item.key}
          />
        </>
      )}
    </View>
  );
}
