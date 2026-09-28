#include "seekr.h"
#include <stdio.h>
#include <string.h>
#include <math.h>

static int tempoVtt(const char *s, double *seg) {
  int h=0,m=0; double f=0;
  if (sscanf(s, "%d:%d:%lf", &h,&m,&f)==3) *seg=h*3600.0+m*60.0+f;
  else if (sscanf(s, "%d:%lf", &m,&f)==2) *seg=m*60.0+f;
  else return 0;
  return isfinite(*seg) && *seg>=0;
}
int seekr_ler_vtt(const char *vtt, SeekrCue *out, int max) {
  int n=0; const char *p=vtt;
  if (!p || !out || max<=0) return 0;
  while (*p && n<max) {
    char linha[1200]; size_t len=strcspn(p,"\r\n");
    if (len>=sizeof linha) { p+=len; while (*p=='\r'||*p=='\n') p++; continue; }
    memcpy(linha,p,len); linha[len]=0; p+=len;
    while (*p=='\r'||*p=='\n') p++;
    char *seta=strstr(linha," --> ");
    if (!seta) continue;
    *seta=0; double a,b;
    if (!tempoVtt(linha,&a) || !tempoVtt(seta+5,&b) || b<=a) continue;
    if (!*p) break;
    len=strcspn(p,"\r\n");
    if (len>=sizeof linha) { p+=len; continue; }
    memcpy(linha,p,len); linha[len]=0; p+=len;
    while (*p=='\r'||*p=='\n') p++;
    char *frag=strstr(linha,"#xywh=");
    if (!frag || strncmp(linha,"https://sprites.seekr.tv/",25)) continue;
    int x,y,w,h;
    if (sscanf(frag+6,"%d,%d,%d,%d",&x,&y,&w,&h)!=4 ||
        x<0 || y<0 || w<=0 || h<=0 || w>640 || h>360 || x>16000 || y>16000) continue;
    *frag=0;
    if (strlen(linha)>=sizeof out[n].url) continue;
    out[n]=(SeekrCue){.inicio=a,.fim=b,.x=x,.y=y,.w=w,.h=h};
    snprintf(out[n].url,sizeof out[n].url,"%s",linha);
    n++;
  }
  return n;
}
int seekr_escolher_cue(const SeekrCue *v, int n, double s) {
  if (!v || n<=0 || !isfinite(s) || s<0) return -1;
  int lo=0,hi=n;
  while (lo<hi) { int mid=(lo+hi)/2; if (v[mid].inicio<=s) lo=mid+1; else hi=mid; }
  int i=lo>0?lo-1:0;
  if (i+1<n && s>(v[i].inicio+v[i+1].inicio)*.5) i++;
  return i;
}
