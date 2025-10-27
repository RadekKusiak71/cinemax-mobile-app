import { CinemaProvider } from '@/contexts/cinema-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from "expo-router";

const Layout = () => {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: '#296fcaff' }}>

            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
                }}
            />

            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                }}
            />

            <Tabs.Screen
                name="tickets"
                options={{
                    title: 'Tickets',
                    headerShown: false,
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="ticket" color={color} />,
                }}
            />

        </Tabs>
    );
}

const PrivateLayout = () => {
    return (
        <CinemaProvider>
            <Layout />
        </CinemaProvider>
    )
}

export default PrivateLayout;
