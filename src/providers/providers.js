import axios from 'axios'
import fs from 'fs'
import path from 'path'
import { compile } from 'html-to-text'

import QueryExtractorCommand from '../commands/QueryExtractorCommand.js'

import QueryExtractorService from '../services/QueryExtractorService.js'

import RequestRepository from '../repositories/RequestRepository.js'
import FileRepository from '../repositories/FileRepository.js'

import abc from '../config/abc.js'

export default new QueryExtractorCommand(
  new QueryExtractorService(
    new RequestRepository(axios),
    new FileRepository(fs, path),
    compile,
    abc
  )
)