import {Controller, Delete, Get, Post, Param, Body, UploadedFile, UseInterceptors, FileInterceptor, Res, 
    Req, HttpException, GoneException, InternalServerErrorException} from '@nestjs/common';
import {ApiUseTags} from '@nestjs/swagger';
import {UserService} from '../service/user.service';
import {GenericController} from './generic.controller';
import {TravelService} from '../service/travel.service';
import {Travel} from '../entities/Travel';
import { TravelDayByDay } from 'entities/TravelDayByDay';
import { TravelDayByDayService } from 'service/travel.daybyday.service';
import { multer, uuidv4, fs } from 'main';
import { TravelResourceService } from 'service/travel-resource.service';
import { TravelResource } from 'entities/TravelResource';
import { JwtInterceptor } from 'interceptor/jwt.interceptor';
import { applicationEnvironment } from '../main';

@Controller('api/travel')
@ApiUseTags('travel')
export class TravelEndpoint extends GenericController<Travel> {
    constructor(
        private readonly travelService: TravelService,
        private readonly travelDayByDayService: TravelDayByDayService,
        private readonly travelResourceService: TravelResourceService
    ) {
        super(travelService);
    }

    @Get('active')
    activeTravels(): Promise<Travel[]> {
        return this.travelService.findActiveTravels();
    }

    @Get(':id/days')
    daysFromTravel(@Param('id') travelId: number): Promise<TravelDayByDay[]> {
        return this.travelDayByDayService.daysFromTravel(travelId);
    }

    @Get(':id/image/:file')
    async imagesFromTravel(
        @Param('id') travelId: number, @Param('file') file: string, 
        @Req() req, @Res() res) {
        
            fs.readFile(applicationEnvironment.TRAVEL_IMAGE_FOLDER + file, function (err, content) {
                if (err) {
                    res.writeHead(400, {'Content-type':'text/html'})
                    console.log(err);
                    res.end('No such image');    
                } else {
                    //specify the content type in the response will be an image
                    res.writeHead(200,{'Content-type':'image/jpg'});
                    res.end(content);
                }

                return res;
            });
    }

    @Delete(':id/image/:file')
    async deleteImageFromTravel(
        @Param('id') travelId: number, @Param('file') file: string, 
        @Req() req, @Res() res) {
            let result = this.travelResourceService.deleteResourceFromTravel(travelId, file);

            fs.unlink(applicationEnvironment.TRAVEL_IMAGE_FOLDER + file, function(err, content) {
                if (err) {
                    res.writeHead(400, {'Content-type':'text/html'})
                    console.log(err);
                    res.end('No such image');    
                } else {
                    //specify the content type in the response will be an image
                    res.writeHead(200, {'Content-type':'text/html'});
                    res.end(content);
                }

                return res;                
            });
    }

    @Get(':id/images')
    async getAllImagesFromTravel (
        @Param('id') travelId: number): Promise<TravelResource[]>{
            return this.travelResourceService.resourcesFromTravel(travelId);
    }

    @Post(':id/images')
    async upload(@Param('id') travelId, @Req() req, @Res() res) {
        let filenames: string[] = [];

        let storage = multer.diskStorage({
            // destination
            destination: function (req, file, cb) {
              cb(null, '/opt/server/uploads/')
            },
            filename: function (req, file, cb) {
                let generatedName = uuidv4() + '.png';
                filenames.push(generatedName);
                cb(null, generatedName);
            }
          });
        
        let upload = multer({ storage: storage }).any();
        let serviceAux = this.travelResourceService;
        upload(req, res, function(err) {
            if(err) {
                return res.status(422).send('an Error occured');
            }
            else {
                // Como no ha habido error, guardamos todos los ficheros...
                filenames.forEach((fileName) => {
                    let item: TravelResource = new TravelResource();
                    item.id = -1;
                    item.extendedValue = '';
                    item.travelId = travelId;
                    item.travelResourceTypeId = 1;
                    item.value = fileName;

                    serviceAux.insert(item);
                });
                
                return res.send('Upload Completed'); 
            }
          });
    }
}