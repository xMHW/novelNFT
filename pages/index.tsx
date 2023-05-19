import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { DOMAIN_URL} from '@/lib/constant';

const IndexPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace(DOMAIN_URL, '/home');
  }, []);

  return null; // or you can return a loading spinner or message while redirecting
};

export default IndexPage;