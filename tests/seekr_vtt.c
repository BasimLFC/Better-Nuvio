#include "seekr.h"
#include <assert.h>
#include <string.h>
#include <math.h>
#include <stdio.h>

int main(void) {
  const char *vtt="WEBVTT\r\n\r\n"
    "00:00:00.000 --> 00:00:10.000\r\n"
    "https://sprites.seekr.tv/t/sheet_001.jpg?exp=123&sig=abc#xywh=0,0,320,180\r\n\r\n"
    "00:00:10.000 --> 00:00:20.000\r\n"
    "https://sprites.seekr.tv/t/sheet_001.jpg?exp=123&sig=abc#xywh=320,0,320,180\r\n\r\n"
    "00:00:20.000 --> 00:00:30.000\r\n"
    "https://evil.example/sheet.jpg#xywh=0,0,320,180\r\n";
  SeekrCue cues[4]={0};
  assert(seekr_ler_vtt(vtt,cues,4)==2);
  assert(fabs(cues[1].inicio-10.0)<.001);
  assert(cues[1].x==320 && cues[1].w==320 && cues[1].h==180);
  assert(strstr(cues[0].url,"#xywh=")==NULL);
  assert(seekr_escolher_cue(cues,2,1)==0);
  assert(seekr_escolher_cue(cues,2,4)==0);
  assert(seekr_escolher_cue(cues,2,6)==1);
  assert(seekr_escolher_cue(cues,2,15)==1);
  assert(seekr_escolher_cue(cues,2,-1)==-1);
  puts("seekr VTT: ok");
  return 0;
}
