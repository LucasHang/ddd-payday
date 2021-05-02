import app from './app';

export default (): void => {
    app.listen(5050, () => console.log('HTTP server listening on port 5050'));
};
