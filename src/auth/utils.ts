import AxiosService from '../services/AxiosService';

interface ValidateEmailOptions {
  email: string;
}

const validateEmail = async ({ email }: ValidateEmailOptions): Promise<boolean> => {
  try {
    const response = await AxiosService.get(`users/?search=${email}`);
    const emails: string[] = response.data as string[];
    return !emails.length;
  } catch (error) {
    console.error('Error validating email:', error);
    throw error;
  }
};

interface FindOrCreateUserOptions {
  email: string;
  [key: string]: any; 
}

export const findOrCreateUser = async (options: FindOrCreateUserOptions): Promise<any> => {
  if (!await validateEmail(options)) {
    return false;
  }

  try {
    const { data } = await AxiosService.post(`users/user`, options);
    return data;
  } catch (error) {
    console.error('Error finding or creating user:', error);
    throw error;
  }
};