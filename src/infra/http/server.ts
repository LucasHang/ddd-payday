import app from './app';

export default (): void => {
    app.listen(3333, () => console.log('HTTP server listening on port 3333'));
};
