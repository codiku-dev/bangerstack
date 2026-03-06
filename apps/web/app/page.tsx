import Landing from './examples/landing';

export default function Home() {
  console.log('LES VAR ENV ', JSON.stringify(process.env, null, 2));
  return <Landing />;
}
