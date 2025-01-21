export const generateRegistrationLink = (baseUrl: string, advisorData: {
  email: string;
  companyName: string;
  fullName: string;
}) => {
  const params = new URLSearchParams();
  params.append('advisor', advisorData.email);
  params.append('company', advisorData.companyName);
  params.append('name', advisorData.fullName);
  
  return `${baseUrl}/register?${params.toString()}`;
};