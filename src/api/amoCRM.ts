import axios from 'axios';

const API_URL = 'https://nurislamtashkulov168.amocrm.ru';
const CLIENT_ID = 'fca1f80f-adaa-4f13-8f88-be69c4397385';
const CLIENT_SECRET = 'OV6iU035lla9WFEd6tiTymKwA5estWFE3SJhmAk1wQLaHb12lE18b3jSpeLxAHtP';
const REDIRECT_URI = 'http://localhost:5175/';
const AUTH_CODE = 'def50200c97565e031a9cb6f59aed278ecd459e0456b2071b63a113306c696965c9b14f70d9cbfad872e17d96e111cdec8f093c471e1faa9addd7c9858f5a5ebf114ea2b4e1226f4d97b26556189056c18675421086842e69fe19c620f371689267a936614ebbe8f2513a9dad7d7170c35884d3a6bc4ef846fdf3180ffc0cabd7595b706415a52c10164677ac87c7f2f8e22b9435e56a1af7c2a65b2e25c08ecbd9ec0b9f90528c0d6f9c6a789b0bebb93a93bb6de5d543567c4e59969dd1f4ca13fedf3a728600b427cebd942e0c8784fcc120a33704efcde5033e7bfeb1b5b8b88f1fa0ba3ca4b1eace89bb36f3d445e94e05197e034bac250e0ec2e5dad7c1096f71696afdce3d0cd8602ca02659dafe857b52ce5bca5011390a8f6a8338a06fe66f40c5e5aedecb34b6d9f5d2d60881de92565364b0309c14e3ba0f04509aeccb19e41e203b4d9c27c1f51f54c101351b0dade27e4082fd3b50fdd32fb28058d019f6e0d881c563d586676c4ffa0807c387f04b17e7c2b7f67b0b5bedc8562ed39a92e10a8f52f97b679dccd8a920003f34efc382752eb7eca4b9ab1a620167d65eae7e9e5a169787acbf64637178e136225eb236b97df86f1a3a6bea3de651d91f5d06fbd4920a95dcaf6b4a08eed0ef86a5b4009e864c74b91537e87ed02967e21fa73a574';

let accessToken = '';

const getAccessToken = async () => {
    if (accessToken) return accessToken;

    try {
        const response = await axios.post(`${API_URL}/oauth2/access_token`, {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type: 'authorization_code',
            code: AUTH_CODE,
            redirect_uri: REDIRECT_URI,
        });
        accessToken = response.data.access_token;
        return accessToken;
    } catch (error) {
        console.error('Error getting access token:', error);
        throw error;
    }
};

export const fetchDeals = async (limit = 3) => {
    const token = await getAccessToken();
    try {
        const response = await axios.get(`${API_URL}/api/v4/leads`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                limit,
            },
        });
        return response.data._embedded.leads;
    } catch (error) {
        console.error('Error fetching deals:', error);
        throw error;
    }
};

export const fetchDealDetails = async (dealId: number) => {
    const token = await getAccessToken();
    try {
        const response = await axios.get(`${API_URL}/api/v4/leads/${dealId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching deal details:', error);
        throw error;
    }
};
