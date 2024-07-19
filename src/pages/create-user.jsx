import { Helmet } from 'react-helmet-async';

import { CreateView } from 'src/sections/createUser/view';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
      <title> Raymond | Business Card </title>
      </Helmet>
      <CreateView />
    </>
  );
}
