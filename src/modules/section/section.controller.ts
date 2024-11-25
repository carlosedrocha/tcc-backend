import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { SectionService } from './section.service';
import { CreateSectionDto, UpdateSectionDto } from './dto';

@Controller('section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  // Buscar todas as seções
  @Get()
  @HttpCode(HttpStatus.OK)
  async getSections(@Query('menuId') menuId?: string) {
    return this.sectionService.getSections(menuId);
  }

  // Buscar uma seção por ID
  @Get(':id')
  async getSectionById(@Param('id') id: string) {
    return this.sectionService.getSectionById(id);
  }

  // Criar uma nova seção
  @Post()
  async createSection(@Body() createSectionDto: CreateSectionDto) {
    return this.sectionService.createSection(createSectionDto);
  }

  // Atualizar uma seção existente

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async updateSection(
    @Param('id') id: string,
    @Body() updateSectionDto: UpdateSectionDto,
  ) {
    return this.sectionService.updateSection(id, updateSectionDto);
  }

  // Deletar uma seção
  @Delete(':id')
  async deleteSection(@Param('id') id: string) {
    return this.sectionService.deleteSection(id);
  }
}
