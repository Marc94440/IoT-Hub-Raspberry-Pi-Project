# IoT-Hub-Raspberry-Pi-Project

## Introduction
<a>
<Node.js application for a Raspberry Pi to control an industry 4.0 factory mock-up using Microsoft's cloud (Azure IoT Hub). While making (photo maquette)>
<This project was presented to me as a 2 months internship at [Dynagile Consulting](https://en.dynagile.com/) to showcase client the usefulness of>
                                                                                                   
## Installation  

### Connect to the Raspberry Pi

Open Windows PowerShell and type :
```bash
ssh pi@'Your Pi ip address'
```
Then type your password.

### Install Node.js and some packages

On your Raspberry Pi or using SSH, first install the latest version of nodejs : 
```bash
curl -sL http://deb.nodesource.com/setup_16.x | sudo -E bash
sudo apt-get -y install nodejs                          
```                                                                                                 
Then clone the repository in a folder named IoT_App in the Pi Desktop :
```bash
git clone https://github.com/Marc94440/IoT-Hub-Raspberry-Pi-Project.git Desktop/IoT_App   
```
Now let's install all the necesarry packages : 
```bash
cd Desktop/IoT_App
npm install
npm install rpio mcp3008.js node-dht-sensor --save 
```
To change the initialization variables :    
```bash
nano config.json       
```
<photo>
  
### Run the application

To run the application you need to copy your device IoT Hub connection string and type the following command :
  
```bash
sudo node index.js 'YOUR AZURE IOT HUB DEVICE CONNECTION STRING'  
```
To get your connection string go to : [Microsoft Azure](https://portal.azure.com/#home) and click on your IoT Hub resource, then click on **Devices**.


![Image1](https://user-images.githubusercontent.com/95703747/183101860-f2ecde62-4dfe-49b9-aa12-36bdd6778aea.png)



And select your device.

  
![Image2](https://user-images.githubusercontent.com/95703747/183102767-5df8ec43-a95f-4adb-9c1e-24c1690a4c79.png)
 
  
Finally copy the **Primary Connection String**.
  
  
![Image3](https://user-images.githubusercontent.com/95703747/183103603-7aa8f389-0d0e-4d5c-b7c3-1b1ee6d59d97.png)  
  
## Credit
This code is based on a sample code from Azure. 

- The original code is available here : https://github.com/Azure-Samples/azure-iot-samples-node/tree/master/iot-hub/Tutorials/RaspberryPiApp
- Step to step IoT Hub tutorial here : https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-raspberry-pi-kit-node-get-started  
- Step to step tutorial to connect to Power Bi for real time data visualisation: https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-live-data-visualization-in-power-bi
- Real time Power Bi Dashboard : https://docs.microsoft.com/en-us/power-bi/connect-data/service-real-time-streaming
- To stream your data into a blob storage : https://docs.microsoft.com/en-us/azure/stream-analytics/stream-analytics-quick-create-portal
- HX711 library : https://github.com/jrj2211/pi-hx711
