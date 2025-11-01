import {
  BsFileEarmarkWordFill,
  BsFileEarmarkExcelFill,
  BsFileEarmarkPptFill,
  BsFileEarmarkPdfFill,
  BsFileEarmarkPlayFill,
  BsFileEarmarkMusicFill,
  BsFileEarmarkFontFill,
  BsFileEarmarkImageFill,
  BsFileEarmarkMinusFill,
  BsApple,
  BsWindows,
  BsFileEarmarkZipFill,
  BsMarkdownFill,
} from "solid-icons/bs"
import {
  FaSolidDatabase,
  FaSolidBook,
  FaSolidCompactDisc,
  FaSolidLink,
} from "solid-icons/fa"
import { IoFolder } from "solid-icons/io"
import { ImAndroid } from "solid-icons/im"
import { Obj, ObjType } from "~/types"
import { ext } from "./path"
import {
  VscodeIconsFileTypeAi2,
  VscodeIconsFileTypePhotoshop2,
  CompressIcons,
  ImagesIcons,
  F115Icons,
  PikPakIcons,
  F123Icons,
  UCIcons,
  OneDriveIcons,
  NutStoreIcons,
  LanZouIcons,
  GoogleIcons,
  AliyunIcons,
  FolderIcons,
} from "~/components"
import { SiAsciinema } from "solid-icons/si"
import { isArchive } from "~/store/archive"

const iconMap = {
  "dmg,ipa,plist,tipa": BsApple,
  "exe,msi": BsWindows,
  apk: ImAndroid,
  db: FaSolidDatabase,
  md: BsMarkdownFill,
  epub: FaSolidBook,
  iso: FaSolidCompactDisc,
  m3u8: BsFileEarmarkPlayFill,
  "doc,docx": BsFileEarmarkWordFill,
  "xls,xlsx": BsFileEarmarkExcelFill,
  "ppt,pptx": BsFileEarmarkPptFill,
  pdf: BsFileEarmarkPdfFill,
  psd: VscodeIconsFileTypePhotoshop2,
  ai: VscodeIconsFileTypeAi2,
  url: FaSolidLink,
  cast: SiAsciinema,
}

export const getIconByTypeAndName = (
  type: number,
  name: string,
  driverName?: string,
) => {
  if (type !== ObjType.FOLDER) {
    for (const [extensions, icon] of Object.entries(iconMap)) {
      if (extensions.split(",").includes(ext(name).toLowerCase())) {
        return icon
      }
    }
    if (isArchive(name)) {
      return BsFileEarmarkZipFill
    }
  }
  switch (type) {
    case ObjType.FOLDER: {
      if (driverName === "115 Open") {
        return F115Icons
      }
      if (driverName === "PikPak") {
        return PikPakIcons
      }
      if (driverName === "123 Open") {
        return F123Icons
      }
      if (driverName === "UC") {
        return UCIcons
      }
      if (driverName === "Onedrive") {
        return OneDriveIcons
      }
      if (driverName === "NutStore") {
        return NutStoreIcons
      }
      if (driverName === "Lanzou") {
        return LanZouIcons
      }
      if (driverName === "GoogleDrive") {
        return GoogleIcons
      }
      if (driverName === "AliyundriveOpen") {
        return AliyunIcons
      }
      return FolderIcons
    }
    case ObjType.OFFICE: {
      if (ext(name) === "doc" || ext(name) === "docx") {
        return BsFileEarmarkWordFill
      }
      if (ext(name) === "xls" || ext(name) === "xlsx") {
        return BsFileEarmarkExcelFill
      }
      if (ext(name) === "ppt" || ext(name) === "pptx") {
        return BsFileEarmarkPptFill
      } else {
        return BsFileEarmarkPdfFill
      }
    }
    case ObjType.IMAGES:
      return ImagesIcons
    case ObjType.ZIP:
      return CompressIcons
    case ObjType.VIDEO:
      return BsFileEarmarkPlayFill
    case ObjType.AUDIO:
      return BsFileEarmarkMusicFill
    case ObjType.TEXT:
      return BsFileEarmarkFontFill
    case ObjType.IMAGE:
      return BsFileEarmarkImageFill
    case ObjType.COMPRESS:
      return CompressIcons
    default:
      return BsFileEarmarkMinusFill
  }
}

export const getIconByObj = (
  obj: Pick<Obj, "type" | "name" | "mount_details">,
) => {
  console.log(obj.mount_details?.driver_name)
  return getIconByTypeAndName(
    obj.type,
    obj.name,
    obj.mount_details?.driver_name,
  )
}
